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
  introduction: 'I have worked in development, marketing, and graphic design.',
}

// 배열 순서대로 카드가 표시되며, 마지막 카드가 01입니다.
export const projects: Project[] = [
  { id: 'moodroom', title: 'SKYLRK', category: 'Interactive Website', year: '2026', theme: 'moodroom', description: 'Justin Bieber의 브랜드 SKYLRK에서 출시 예정인 뮤직 플레이어를 미리 상상해보면서 구성한 인터랙티브 웹사이트 개인작업입니다. 플레이어 안에서는 Justin Bieber의 SWAG II 앨범을 미리듣기로 재생할 수 있으며, 음악의 분위기와 비트가 백그라운드의 색상에 반영되어 번지도록 했습니다. 플레이어의 버튼으로 곡 목록을 열거나 이전·다음 곡을 선택하고, 미리듣기를 재생할 수 있습니다.', role: 'Planning · Development · Graphic Design', url: 'https://wanseo.github.io/swag2/', image: 'images/moodroom-preview.jpg?v=3' },
  { id: 'potential', title: 'POTENTIAL', category: 'Website Development · Graphic Design', year: '2026', theme: 'potential', description: '브랜드 POTENTIAL의 제품을 판매하는 웹사이트입니다. 제품 카테고리 · 상세 페이지 · 브랜드 소개와 아카이브를 탐색할 수 있도록 구성했습니다. 기획, 개발 및 디자인을 진행하고 있습니다. (제작 중)', role: 'Planning · Development · Graphic Design', url: 'https://wanseo.github.io/potential/', image: 'images/potential-preview.jpg' },
  { id: 'glyfing', title: 'GLYF', category: 'Interactive Website Development · Graphic Design', year: '2026', theme: 'glyfing', description: '화장품 브랜드 GLYF 의 바이럴 콘텐츠로 활용할 인터렉티브 웹사이트를 기획하고 개발 및 디자인을 진행했습니다. 브랜드 이미지에 맞게 핑크 글리터 배경과 컨셉에 맞는 에셋들을 활용하여 웹사이트를 구성하였습니다. 방향키로 캐릭터를 움직일 수 있고, 화면을 구성하는 에셋을 누르면 게임 및 촬영 페이지로 연결됩니다. (제작 중)', role: 'Planning · Development · Graphic Design', url: 'https://wanseo.github.io/glyfing/', image: 'images/glyfing-preview.jpg' },
  { id: 'guestbook', title: 'Guestbook', category: 'Interactive Website Development · Graphic Design', year: '2026', theme: 'form', description: '픽셀 그래픽과 움직이는 배경으로 만든 작은 방명록입니다. 방문자들은 자신의 이름과 함께 방명록을 남길 수 있습니다. 말랑이 캐릭터는 랜덤으로 배정됩니다. 픽셀 형태의 말랑이, 말풍선, 배경, 입력창 등 웹사이트를 구성하는 모든 에셋을 디자인했습니다.', role: 'Planning · Development · Graphic Design', url: 'https://wanseo.github.io/myfirstweb/', video: 'videos/guestbook.mp4?v=2', poster: 'videos/guestbook.jpg?v=2' },
  { id: 'everylife', title: 'everylife', category: 'Merch Graphic Design', year: '2026', theme: 'everylife', description: '미국 프리미엄 기저귀 브랜드 everylife를 위한 굿즈 스티커를 디자인했습니다. 소프트한 느낌의 브랜드 키 컬러와 세리프 로고를 활용해 기저귀를 착용하는 다양한 인종의 아기 캐릭터 · 기저귀 · 로고 스티커까지 확장했습니다.', role: 'Illustration · Graphic Design', image: 'images/everylife-design-board-spaced.svg?v=3' },
]
