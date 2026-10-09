export interface Project {
  id: string
  title: string
  category: string
  year: string
  theme: string
  description: string
  url?: string
  video?: string
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
  { id: 'guestbook', title: 'GUESTBOOK', category: 'INTERACTIVE GUESTBOOK', year: '2026', theme: 'form', description: '픽셀 그래픽과 움직이는 배경으로 만든 작은 방명록입니다.', url: 'https://wanseo.github.io/myfirstweb/', video: 'videos/guestbook.mp4', poster: 'videos/guestbook.jpg' },
]
