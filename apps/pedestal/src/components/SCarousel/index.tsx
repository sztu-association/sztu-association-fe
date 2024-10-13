import { Image, Carousel as SztuCarousel } from 'antd'

interface ICarousel {
  title: string
  content: string
  img: string
}
interface CarouselProps {
  list: ICarousel[]
}
export default function Carousel(props: CarouselProps) {
  const contentStyle: React.CSSProperties = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const { list } = props
  return (
    <SztuCarousel autoplay>
      {list.map(item => (
        <div key={item.title}>
          <h3 style={contentStyle}>{item.title}</h3>
        </div>
      ))}
    </SztuCarousel>

  )
}
