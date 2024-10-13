import Activiy from '@/components/activity'
import News from '@/components/news'
import Carousel from '@/components/SCarousel'

export default function Index() {
  const list = [
    { title: '1', content: '1', img: 'https://i04piccdn.sogoucdn.com/17d017c1d7478379' },
    { title: '2', content: '2', img: 'https://i04piccdn.sogoucdn.com/17d017c1d7478379' },
    { title: '3', content: '3', img: 'https://i04piccdn.sogoucdn.com/17d017c1d7478379' },
  ]
  return (
    <div className="h-full">
      <Carousel list={list} />
      {/* // 活动 activity
      // 通知 news */}
      <div className="mt-10 flex  gap-4 flex-row">
        <div className="flex-1">
          <Activiy />
        </div>
        <div className="flex-1">
          <News />
        </div>
      </div>
    </div>
  )
}
