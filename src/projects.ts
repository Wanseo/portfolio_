export interface Project {
  id: string
  title: string
  category: string
  year: string
  theme: string
  description: string
  role?: string
  url?: string
  video?: string
  image?: string
  poster?: string
}

// public 파일 경로는 앞에 / 없이 입력하세요. 예: videos/project-01.mp4
export const profile = {
  name: 'WANSEO',
  email: 'wanseo1206@gmail.com',
  instagram: 'https://www.instagram.com/wsjoy_/',
  introduction: 'I experiment with new experiences through interactive websites.',
}

// 새 작업은 배열 맨 앞에 추가하세요. 최신 작업이 왼쪽부터 표시됩니다.
export const projects: Project[] = [
  { id: 'guestbook', title: 'GUESTBOOK', category: 'development, graphic design', year: '2026', theme: 'form', description: '픽셀 그래픽과 움직이는 배경으로 만든 작은 방명록입니다.', role: 'Planning, Design, Development', url: 'https://wanseo.github.io/myfirstweb/', video: 'videos/guestbook.mp4?v=2', poster: 'videos/guestbook.jpg?v=2' },
  { id: 'glyfing', title: 'GLYFING', category: 'development, graphic design', year: '2026', theme: 'glyfing', description: '핑크 글리터 배경 속 세 눈 캐릭터와 오브젝트를 구성한 인터랙티브 3D 웹사이트입니다. 방향키로 캐릭터를 움직이며 탐색할 수 있습니다.', role: 'Design, Development', url: 'https://wanseo.github.io/glyfing/', image: 'images/glyfing-preview.jpg' },
  { id: 'potential', title: 'POTENTIAL', category: 'development, graphic design', year: '2026', theme: 'potential', description: '브랜드 POTENTIAL의 굿즈와 제품을 소개하는 웹사이트입니다. 제품 카테고리, 상세 페이지, 브랜드 소개와 아카이브를 탐색할 수 있도록 구성했습니다.', role: 'Design, Development', url: 'https://wanseo.github.io/potential/', image: 'images/potential-preview.jpg' },
  { id: 'everylife', title: 'EVERYLIFE', category: 'merch graphic design', year: '', theme: 'everylife', description: '프리미엄 기저귀 브랜드 everylife를 위한 굿즈 디자인입니다. 소프트한 느낌의 브랜드 키 컬러와 세리프 로고를 바탕으로 기저귀를 입는 다양한 인종의 아기 캐릭터를 표현하고, 기저귀, 로고 스티커까지 확장했습니다.', role: 'Graphic Design, Illustration', image: 'images/everylife-design-board-spaced.svg?v=3' },
]
