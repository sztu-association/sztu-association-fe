<template>
  <div>
    <el-card shadow="never">
      <el-row justify="space-between">
        <el-col :span="10" :xs="24">
          <div class="flex h-full py-2">
            <img
              class="w-20 h-20 mr-5 rounded-full border border-borderColor"
              src="@/assets/image/avatar.jpg"
              alt=""
            />
            <div>
              <h3 class="mb-2">用户名</h3>
              <p class="text-sm text-gray">组织111</p>
            </div>
          </div>
        </el-col>
        <el-col :span="8" :xs="24">
          <div class="flex justify-around py-2">
            <div class="mr-7">
              <div class="text-gray mb-2">消息</div>
              <div class="text-6">22</div>
            </div>
            <div>
              <div class="text-gray mb-2">代办</div>
              <div class="text-6">4/10</div>
            </div>
            <div>
              <div class="text-gray mb-2">项目</div>
              <div class="text-6">10</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
    <el-row class="mt-3" :gutter="12">
      <el-col :span="18" :xs="24">
        <el-card shadow="never">
          <div class="flex flex-wrap">
            <div
              class="w-30% <sm:w-100% bg-fill rounded p-4 mt-2 mx-1"
              v-for="(item, index) in list"
              :key="index"
            >
              <div class="flex items-center">
                <img :src="item.img" alt="" class="h-14 w-14 mb-1" />
                <span class="ml-2 text-xl">{{ item.name }}</span>
              </div>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </el-card>
        <el-card class="mt-3" shadow="never">
          <template #header>
            <div class="flex justify-between">
              <span>动态</span>
              <el-button type="primary" link>更多</el-button>
            </div>
          </template>
          <div
            v-for="(item, index) in dynamicList"
            :key="index"
            class="flex mb-4 border-b border-borderColor last:border-0"
          >
            <div>
              <img src="@/assets/image/avatar.jpg" class="w-10 mb-2 h-10 rounded-full" alt="" />
            </div>
            <div class="ml-4">
              <div>{{ item.desc }}</div>
              <div>{{ item.timestamp }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :xs="24">
        <el-card shadow="never" class="<sm:mt-3">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const list = [
  {
    name: 'Vue3',
    desc: '渐进式 JavaScript 框架',
    img: 'https://cn.vuejs.org/logo.svg'
  },
  {
    name: 'Vite',
    desc: '下一代前端开发与构建工具',
    img: 'https://vitejs.dev/logo.svg'
  },
  {
    name: 'Pinia',
    desc: '新一代的状态管理库',
    img: 'https://pinia.web3doc.top/logo.svg'
  },
  {
    name: 'Unocss',
    desc: '原子化预设样式',
    img: 'https://unocss.dev/logo.svg'
  },
  {
    name: 'TypeScript',
    desc: 'js 超集语言',
    img: 'https://img0.baidu.com/it/u=648247815,3161686023&fm=253&fmt=auto&app=138&f=PNG'
  }
];
const activities = [
  {
    content: '创建项目',
    timestamp: '2024-9-21'
  },
  {
    content: '迭代项目',
    timestamp: '2024-9-21'
  },
  {
    content: '发布项目',
    timestamp: '2024-9-21'
  }
];
const dynamicList = [
  {
    desc: '加入了项目',
    timestamp: '2024-9-21'
  },
  {
    desc: '发布了项目',
    timestamp: '2024-9-21'
  },
  {
    desc: '迭代了项目',
    timestamp: '2024-9-21'
  }
];
</script>
