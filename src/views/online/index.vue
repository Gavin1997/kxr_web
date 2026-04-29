<script setup lang="ts">
import Motion from "./utils/motion";
import { ref, markRaw } from "vue";
import { useRouter } from "vue-router";
import { message } from "@/utils/message";
import { Download, User, VideoPlay, Bell, Star } from "@element-plus/icons-vue";

// 导入截图
import screenshot1 from "@/assets/images/1.png";
import screenshot2 from "@/assets/images/2.png";
import screenshot3 from "@/assets/images/3.png";
import screenshot4 from "@/assets/images/4.png";

defineOptions({
  name: "KexinrenLanding"
});

const router = useRouter();

// 截图数据
const screenshots = ref([
  { id: 1, src: screenshot1, label: "首页动态" },
  { id: 2, src: screenshot2, label: "明星订阅" },
  { id: 3, src: screenshot3, label: "影视动态" },
  { id: 4, src: screenshot4, label: "cp订阅" }
]);

// 功能列表
const features = ref([
  // {
  //   icon: markRaw(User),
  //   title: "趣味交友",
  //   description: "遇见志同道合的星友，一起追星一起嗑，让追星不再孤单",
  //   color: "#EE72C0"
  // },
  {
    icon: markRaw(VideoPlay),
    title: "追剧神器",
    description: "海量影视资讯、官方CP、更新进度，同步更新",
    color: "#7B6BEE"
  },
  {
    icon: markRaw(Bell),
    title: "明星订阅",
    description: "订阅你喜欢的明星，第一时间获取最新动态和独家资讯",
    color: "#EE72C0"
  }
  // {
  //   icon: markRaw(Star),
  //   title: "追星社区",
  //   description: "打榜应援、活动组织、周边，全方位追星体验",
  //   color: "#7B6BEE"
  // }
]);

// 特色亮点
const highlights = ref([
  { number: "1000+", label: "活跃用户" },
  { number: "500+", label: "入驻明星" },
  { number: "20000+", label: "影视资讯" },
  { number: "24/7", label: "实时更新" }
]);

const handleGetStarted = () => {
  message("欢迎来到嗑星人！", { type: "success" });
  // 可以跳转到其他页面
  // router.push("/welcome");
};

const handleLearnMore = () => {
  // 滚动到功能区域
  const featuresSection = document.getElementById("features");
  featuresSection?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background"></div>
      <div class="hero-content">
        <Motion>
          <div class="logo-container">
            <img src="/logo.svg" alt="嗑星人" class="logo" />
          </div>
        </Motion>

        <Motion :delay="100">
          <h1 class="hero-title">
            嗑星人
            <span class="gradient-text">LE GALAXIE</span>
          </h1>
        </Motion>

        <Motion :delay="200">
          <p class="hero-subtitle">遇见同好 · 一起追星 · 共享快乐</p>
          <p class="hero-description">
            <!-- 全新的追星社交平台，让你和千万星友一起，追剧、交友、追星无缝衔接
              -->
            嗑星人是一款专为海外女明星粉丝打造的追星神器。 实时追踪偶像在
            Instagram、X（原Twitter）
            等平台的最新动态，第一时间获取营业照、生活分享和影视资讯。
            支持高清图片一键保存，并提供智能推送提醒，不错过任何营业瞬间。
            所有内容自动汇总展示，追星更轻松、更高效。
          </p>
          <p class="hero-subtitle">“嗑星人——人人嗑美拉 💫”</p>
        </Motion>

        <Motion :delay="300">
          <div class="hero-actions">
            <!-- <el-button
              type="primary"
              size="large"
              round
              class="cta-button primary"
              @click="handleGetStarted"
            >
              <el-icon class="mr-2"><Download /></el-icon>
              立即开始
            </el-button> -->
            <el-button
              size="large"
              round
              class="cta-button secondary"
              @click="handleLearnMore"
            >
              了解更多
            </el-button>
          </div>
        </Motion>

        <!-- 数据亮点 -->
        <Motion :delay="400">
          <div class="highlights">
            <div
              v-for="(item, index) in highlights"
              :key="index"
              class="highlight-item"
            >
              <div class="highlight-number">{{ item.number }}</div>
              <div class="highlight-label">{{ item.label }}</div>
            </div>
          </div>
        </Motion>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features-section">
      <div class="section-container">
        <Motion :delay="100">
          <h2 class="section-title">核心功能</h2>
          <p class="section-subtitle">全方位追星体验，让你的追星生活更精彩</p>
        </Motion>

        <div class="features-grid">
          <Motion
            v-for="(feature, index) in features"
            :key="index"
            :delay="200 + index * 100"
          >
            <div
              class="feature-card"
              :style="{ '--card-color': feature.color }"
            >
              <div class="feature-icon-wrapper">
                <el-icon :size="40" class="feature-icon">
                  <component :is="feature.icon" />
                </el-icon>
              </div>
              <h3 class="feature-title">{{ feature.title }}</h3>
              <p class="feature-description">{{ feature.description }}</p>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- Screenshots Section -->
    <section class="screenshots-section">
      <div class="section-container">
        <Motion :delay="100">
          <h2 class="section-title">应用预览</h2>
          <p class="section-subtitle">直观体验嗑星人的精彩功能</p>
        </Motion>

        <div class="screenshots-wrapper">
          <Motion
            v-for="(screenshot, index) in screenshots"
            :key="screenshot.id"
            :delay="200 + index * 100"
          >
            <div class="screenshot-item">
              <div class="phone-mockup">
                <div class="phone-frame">
                  <div class="phone-notch"></div>
                  <img
                    :src="screenshot.src"
                    :alt="screenshot.label"
                    class="screenshot-img"
                    loading="lazy"
                  />
                </div>
              </div>
              <div class="screenshot-label">{{ screenshot.label }}</div>
            </div>
          </Motion>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-background"></div>
      <div class="cta-content">
        <Motion>
          <h2 class="cta-title">准备好开始你的追星之旅了吗？</h2>
          <p class="cta-subtitle">加入我们，和千万星友一起嗑CP，追爱豆！</p>
        </Motion>

        <Motion :delay="200">
          <div class="cta-actions">
            <el-button
              type="primary"
              size="large"
              round
              class="cta-button-large"
              @click="handleGetStarted"
            >
              <el-icon><Download /></el-icon>
              立即下载
            </el-button>
          </div>
        </Motion>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="/logo.svg" alt="嗑星人" class="w-10 h-10" />
          <span class="footer-brand">嗑星人</span>
        </div>
        <div class="footer-text">
          <p>© 2025 嗑星人 KE XING REN. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }

  50% {
    transform: translate(30px, 30px) scale(1.1);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }
}

.landing-page {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
  background: #fff;
}

// Hero Section
.hero-section {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, #ee72c0 0%, #7b6bee 100%);
  opacity: 0.95;

  &::before {
    position: absolute;
    top: -50%;
    right: -20%;
    width: 100%;
    height: 100%;
    content: "";
    background: radial-gradient(
      circle,
      rgb(255 255 255 / 10%) 0%,
      transparent 70%
    );
    animation: float 20s ease-in-out infinite;
  }

  &::after {
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 80%;
    height: 80%;
    content: "";
    background: radial-gradient(
      circle,
      rgb(255 255 255 / 8%) 0%,
      transparent 70%
    );
    animation: float 15s ease-in-out infinite reverse;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  color: #fff;
  text-align: center;
}

.logo-container {
  margin-bottom: 2rem;

  .logo {
    width: 120px;
    height: 120px;
    filter: drop-shadow(0 4px 20px rgb(0 0 0 / 20%));
    animation: pulse 3s ease-in-out infinite;
  }
}

.hero-title {
  margin-bottom: 1rem;
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  text-shadow: 0 4px 20px rgb(0 0 0 / 20%);

  @media (width <= 768px) {
    font-size: 2.5rem;
  }
}

.gradient-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.3em;
  opacity: 0.95;

  @media (width <= 768px) {
    font-size: 1rem;
  }
}

.hero-subtitle {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 500;
  opacity: 0.95;

  @media (width <= 768px) {
    font-size: 1.3rem;
  }
}

.hero-description {
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.9;

  @media (width <= 768px) {
    font-size: 1rem;
  }
}

.hero-description-sub {
  font-size: 3rem;
  font-weight: 800;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
}

.cta-button {
  padding: 1.2rem 2.5rem !important;
  font-size: 1.1rem !important;
  font-weight: 600;
  transition: all 0.3s ease;

  &.primary {
    color: #ee72c0 !important;
    background: #fff !important;
    border: none !important;
    box-shadow: 0 4px 20px rgb(0 0 0 / 15%);

    &:hover {
      box-shadow: 0 6px 30px rgb(0 0 0 / 25%);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    color: #fff !important;
    background: transparent !important;
    border: 2px solid #fff !important;

    &:hover {
      background: rgb(255 255 255 / 10%) !important;
      transform: translateY(-2px);
    }
  }
}

.highlights {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 2rem;
  background: rgb(255 255 255 / 10%);
  border: 1px solid rgb(255 255 255 / 20%);
  border-radius: 20px;
  backdrop-filter: blur(10px);

  @media (width <= 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.highlight-item {
  text-align: center;
}

.highlight-number {
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 700;

  @media (width <= 768px) {
    font-size: 1.5rem;
  }
}

.highlight-label {
  font-size: 0.95rem;
  opacity: 0.9;
}

// Features Section
.features-section {
  padding: 6rem 2rem;
  background: #f8f9fa;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  margin-bottom: 1rem;
  font-size: 2.8rem;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #ee72c0, #7b6bee);
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (width <= 768px) {
    font-size: 2rem;
  }
}

.section-subtitle {
  margin-bottom: 4rem;
  font-size: 1.2rem;
  color: #666;
  text-align: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  padding: 2.5rem;
  text-align: center;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 8%);
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--card-color);
    box-shadow: 0 12px 40px rgb(0 0 0 / 15%);
    transform: translateY(-8px);
  }
}

.feature-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  color: #fff;
  background: linear-gradient(135deg, #ee72c0, #7b6bee);
  border-radius: 20px;
  transition: all 0.3s ease;

  .feature-card:hover & {
    transform: scale(1.1) rotate(5deg);
  }
}

.feature-title {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
}

.feature-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
}

// Screenshots Section
.screenshots-section {
  padding: 6rem 2rem;
  background: linear-gradient(180deg, #f8f9fa 0%, #fff 100%);
}

.screenshots-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (width <= 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }

  @media (width <= 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.screenshot-item {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.phone-mockup {
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.02);
  }
}

.phone-frame {
  position: relative;
  width: 100%;
  max-width: 260px;
  padding: 1rem 0.8rem;
  background: linear-gradient(135deg, #ee72c0, #7b6bee);
  border-radius: 2.5rem;
  box-shadow:
    0 10px 40px rgb(0 0 0 / 15%),
    0 0 0 2px rgb(255 255 255 / 50%);

  @media (width <= 1200px) {
    max-width: 280px;
  }

  @media (width <= 768px) {
    max-width: 240px;
    padding: 0.8rem 0.6rem;
    border-radius: 2rem;
  }
}

.phone-notch {
  position: absolute;
  top: 0.5rem;
  left: 50%;
  z-index: 10;
  width: 120px;
  height: 1.5rem;
  background: #000;
  border-radius: 0 0 1rem 1rem;
  transform: translateX(-50%);

  @media (width <= 768px) {
    width: 100px;
    height: 1.2rem;
  }
}

.screenshot-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1.8rem;
  box-shadow: 0 4px 20px rgb(0 0 0 / 20%);

  @media (width <= 768px) {
    border-radius: 1.5rem;
  }
}

.screenshot-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  text-align: center;
}

// CTA Section
.cta-section {
  position: relative;
  padding: 6rem 2rem;
  overflow: hidden;
}

.cta-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(135deg, #7b6bee 0%, #ee72c0 100%);
  opacity: 0.95;
}

.cta-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
  color: #fff;
  text-align: center;
}

.cta-title {
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgb(0 0 0 / 20%);

  @media (width <= 768px) {
    font-size: 1.8rem;
  }
}

.cta-subtitle {
  margin-bottom: 2.5rem;
  font-size: 1.3rem;
  opacity: 0.95;

  @media (width <= 768px) {
    font-size: 1.1rem;
  }
}

.cta-actions {
  display: flex;
  justify-content: center;
}

.cta-button-large {
  padding: 1.5rem 3rem !important;
  font-size: 1.2rem !important;
  font-weight: 600;
  color: #7b6bee !important;
  background: #fff !important;
  border: none !important;
  box-shadow: 0 4px 20px rgb(0 0 0 / 15%);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 30px rgb(0 0 0 / 25%);
    transform: translateY(-2px);
  }
}

// Footer
.footer {
  padding: 3rem 2rem;
  color: #fff;
  background: #2c3e50;
}

.footer-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.footer-logo-img {
  width: 40px;
  height: 40px;
  filter: brightness(0) invert(1);
}

.footer-brand {
  font-size: 1.5rem;
  font-weight: 600;
}

.footer-text {
  text-align: center;
  opacity: 0.8;

  p {
    margin: 0;
  }
}
</style>
