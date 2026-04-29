<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { getConfig } from "@/config";

defineOptions({
  name: "office"
});

/**
 * 默认的三方目标地址（被包一层的二维码 url）
 * - 由于该地址在微信内会被拦截/提示风险，所以让用户在外部浏览器中打开
 * - 也支持通过 ?url=<encodeURIComponent(目标地址)> 进行动态覆盖，便于复用
 *
 * 优先级：URL query 参数(?url=xxx) > public/platform-config.json 中的 OfficeTargetUrl > 内置兜底
 * 如需修改默认跳转地址，直接改 `public/platform-config.json` 中的 `OfficeTargetUrl` 即可，
 * 部署后修改该 JSON 文件无需重新构建前端。
 */
const FALLBACK_TARGET_URL = "https://u2.zjcbj.com/k4XHEtY5";
const DEFAULT_TARGET_URL = getConfig()?.OfficeTargetUrl || FALLBACK_TARGET_URL;

const ua = navigator.userAgent || "";
const isWechat = /MicroMessenger/i.test(ua);
const isQQ = /QQ\//i.test(ua) || /QQBrowser/i.test(ua);
const isWeibo = /WeiBo/i.test(ua);
const isIOS = /iPhone|iPad|iPod/i.test(ua);
const isAndroid = /Android/i.test(ua);

/** 是否处于"App 内置浏览器"（需要引导用户跳到系统浏览器） */
const isInApp = isWechat || isQQ || isWeibo;

/** 系统浏览器的中文名（更友好的引导文案） */
const systemBrowserName = computed(() => {
  if (isIOS) return "Safari 浏览器";
  if (isAndroid) return "默认浏览器";
  return "系统浏览器";
});

/** 当前要打开/跳转的真实地址 */
const targetUrl = ref(DEFAULT_TARGET_URL);

/** 跳转倒计时（仅外部浏览器场景） */
const countdown = ref(2);
let timer: ReturnType<typeof setInterval> | null = null;

/** 解析 url 参数，允许覆盖目标地址（兼容 hash / history 模式） */
const resolveTargetUrl = (): string => {
  try {
    const search = window.location.search || "";
    const hash = window.location.hash || "";
    const queryFromHash = hash.includes("?")
      ? hash.slice(hash.indexOf("?"))
      : "";
    const params = new URLSearchParams(search || queryFromHash);
    const fromQuery = params.get("url") || params.get("redirect");
    if (fromQuery && /^https?:\/\//i.test(fromQuery)) {
      return fromQuery;
    }
  } catch {
    /* noop */
  }
  return DEFAULT_TARGET_URL;
};

/** 触发跳转 */
const redirectNow = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  window.location.replace(targetUrl.value);
};

/** 复制链接（兜底：用户也可以手动粘贴到浏览器） */
const copied = ref(false);
const copyLink = async () => {
  const text = targetUrl.value;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      const input = document.createElement("textarea");
      input.value = text;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    copied.value = true;
    setTimeout(() => (copied.value = false), 1800);
  } catch {
    copied.value = false;
  }
};

onMounted(() => {
  targetUrl.value = resolveTargetUrl();

  if (!isInApp) {
    // 非微信/QQ 等内置浏览器：执行倒计时自动跳转
    timer = setInterval(() => {
      countdown.value -= 1;
      if (countdown.value <= 0) {
        redirectNow();
      }
    }, 1000);
  }
});
</script>

<template>
  <div class="qr-gateway" :class="{ 'is-wechat': isInApp }">
    <!-- ============== 微信/QQ 等 App 内置浏览器：引导外部打开 ============== -->
    <template v-if="isInApp">
      <div class="mask">
        <!-- 右上角指向 ··· 的箭头与提示 -->
        <div class="arrow-wrap">
          <svg
            class="arrow"
            viewBox="0 0 120 140"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M110 10 C 80 30, 60 60, 40 100"
              stroke="#fff"
              stroke-width="4"
              fill="none"
              stroke-linecap="round"
              stroke-dasharray="6 8"
            />
            <path d="M30 95 L 42 102 L 46 88 Z" fill="#fff" />
          </svg>
          <div class="arrow-tip">
            <span class="dots">···</span>
            <span class="tip-text">点这里</span>
          </div>
        </div>

        <div class="hint-card animate__animated animate__fadeInUp">
          <div class="title">请在{{ systemBrowserName }}中打开</div>
          <div class="subtitle">当前页面无法在微信中直接访问</div>

          <ol class="steps">
            <li>
              <span class="step-no">1</span>
              <span class="step-text">
                点击右上角
                <em class="dots-inline">···</em>
                按钮
              </span>
            </li>
            <li>
              <span class="step-no">2</span>
              <span class="step-text">
                选择
                <em>「在{{ isIOS ? "Safari" : "浏览器" }}中打开」</em>
              </span>
            </li>
          </ol>

          <div class="copy-area">
            <div class="copy-label">或复制链接到浏览器打开</div>
            <div class="copy-row">
              <span class="copy-url">{{ targetUrl }}</span>
              <button class="copy-btn" type="button" @click="copyLink">
                {{ copied ? "已复制" : "复制" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ============== 外部浏览器：自动跳转 + 兜底按钮 ============== -->
    <template v-else>
      <div class="redirect-page">
        <div class="brand animate__animated animate__fadeInDown">
          <div class="logo">嗑</div>
          <div class="brand-name">嗑星人</div>
        </div>

        <div class="loader">
          <span />
          <span />
          <span />
        </div>

        <div class="redirect-tip animate__animated animate__fadeIn">
          正在为您跳转... <b>{{ countdown }}s</b>
        </div>

        <button class="primary-btn" type="button" @click="redirectNow">
          立即打开
        </button>

        <div class="redirect-url" :title="targetUrl">{{ targetUrl }}</div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
@import url("animate.css");

@keyframes arrow-bounce {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(-6px, 6px);
  }
}

@keyframes loader-bounce {
  0%,
  100% {
    opacity: 0.4;
    transform: translateY(0);
  }

  50% {
    opacity: 1;
    transform: translateY(-10px);
  }
}

.qr-gateway {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  font-size: 14px;
  color: #1f2937;
  user-select: none;
  background: linear-gradient(160deg, #6a8dff 0%, #8b5cf6 60%, #ec4899 100%);
  -webkit-tap-highlight-color: transparent;
}

/* ===================== 微信/QQ 引导遮罩 ===================== */
.mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgb(0 0 0 / 78%);
  backdrop-filter: blur(2px);
}

.arrow-wrap {
  position: absolute;
  top: 12px;
  right: 14px;
  width: 130px;
  height: 150px;
  pointer-events: none;
}

.arrow {
  width: 100%;
  height: 100%;
  animation: arrow-bounce 1.4s ease-in-out infinite;
}

.arrow-tip {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  line-height: 1.2;
  color: #fff;

  .dots {
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 2px;
  }

  .tip-text {
    margin-top: 2px;
    font-size: 13px;
    opacity: 0.92;
  }
}

.hint-card {
  position: relative;
  width: 100%;
  max-width: 340px;
  padding: 28px 22px 22px;
  margin-top: 120px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 18px 40px rgb(0 0 0 / 25%);

  .title {
    font-size: 19px;
    font-weight: 600;
    color: #111827;
    text-align: center;
  }

  .subtitle {
    margin-top: 6px;
    font-size: 13px;
    color: #6b7280;
    text-align: center;
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 0;
    margin: 22px 0 18px;
    list-style: none;

    li {
      display: flex;
      gap: 12px;
      align-items: center;
      padding: 12px 14px;
      font-size: 14px;
      line-height: 1.5;
      color: #374151;
      background: #f5f7fb;
      border-radius: 10px;
    }

    .step-no {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      font-size: 13px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #6a8dff, #8b5cf6);
      border-radius: 50%;
    }

    em {
      font-style: normal;
      font-weight: 600;
      color: #4f46e5;
    }

    .dots-inline {
      display: inline-block;
      padding: 0 6px;
      margin: 0 2px;
      font-weight: 700;
      color: #111827;
      background: #e5e7eb;
      border-radius: 4px;
    }
  }

  .copy-area {
    padding-top: 14px;
    margin-top: 8px;
    border-top: 1px dashed #e5e7eb;
  }

  .copy-label {
    margin-bottom: 8px;
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
  }

  .copy-row {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 8px 10px;
    background: #f5f7fb;
    border-radius: 8px;
  }

  .copy-url {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #4b5563;
    white-space: nowrap;
  }

  .copy-btn {
    flex-shrink: 0;
    padding: 6px 12px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    background: linear-gradient(135deg, #6a8dff, #8b5cf6);
    border: 0;
    border-radius: 6px;
    transition: transform 0.15s;

    &:active {
      transform: scale(0.96);
    }
  }
}

/* ===================== 外部浏览器跳转页 ===================== */
.redirect-page {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0 32px;
  color: #fff;
}

.brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    font-size: 32px;
    font-weight: 700;
    color: #fff;
    background: rgb(255 255 255 / 18%);
    border: 1px solid rgb(255 255 255 / 28%);
    border-radius: 18px;
    box-shadow: 0 8px 24px rgb(0 0 0 / 18%);
    backdrop-filter: blur(8px);
  }

  .brand-name {
    margin-top: 12px;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
  }
}

.loader {
  display: flex;
  gap: 8px;
  margin-bottom: 18px;

  span {
    display: block;
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    opacity: 0.85;
    animation: loader-bounce 1.2s ease-in-out infinite;
  }

  span:nth-child(2) {
    animation-delay: 0.15s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }
}

.redirect-tip {
  margin-bottom: 28px;
  font-size: 15px;
  color: rgb(255 255 255 / 92%);

  b {
    margin-left: 4px;
    font-weight: 600;
    color: #fff;
  }
}

.primary-btn {
  padding: 12px 36px;
  font-size: 15px;
  font-weight: 600;
  color: #4f46e5;
  cursor: pointer;
  background: #fff;
  border: 0;
  border-radius: 999px;
  box-shadow: 0 10px 24px rgb(0 0 0 / 18%);
  transition:
    transform 0.18s,
    box-shadow 0.18s;

  &:active {
    box-shadow: 0 6px 14px rgb(0 0 0 / 18%);
    transform: translateY(1px) scale(0.98);
  }
}

.redirect-url {
  position: absolute;
  bottom: 24px;
  left: 50%;
  max-width: calc(100% - 48px);
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgb(255 255 255 / 65%);
  white-space: nowrap;
  transform: translateX(-50%);
}
</style>
