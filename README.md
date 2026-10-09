# Vite + TypeScript

프레임워크 없는 Vite `vanilla-ts` 프로젝트입니다. Node.js 24를 사용합니다.

```sh
npm ci
npm run dev
npm run build
```

빌드 결과는 `dist/`에 생성됩니다.

## GitHub Pages

1. `Wanseo/portfolio_` 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
2. 변경 파일과 `package-lock.json`을 커밋하여 `main`에 푸시합니다.
3. **Actions → Deploy to GitHub Pages**에서 배포 성공을 확인합니다. **Run workflow**로 수동 배포할 수도 있습니다.

배포 주소: https://wanseo.github.io/portfolio_/

`main`에 푸시할 때마다 `.github/workflows/deploy.yml`이 `npm ci`, `npm run build`를 실행하고 `dist/`를 배포합니다. 별도의 배포 토큰은 필요하지 않습니다.

`vite.config.ts`의 `base`는 현재 저장소에 맞춰 `/portfolio_/`로 설정되어 있습니다. 저장소 이름을 바꾸면 이 값도 변경하세요. 사용자 사이트(`wanseo.github.io` 저장소) 또는 사용자 지정 도메인으로 배포하면 `/`로 변경하세요.

`src/`에서 `public/`의 파일을 참조할 때는 `${import.meta.env.BASE_URL}파일명`을 사용하세요. HTML에서는 `%BASE_URL%파일명`을 사용할 수 있습니다. `src/assets/` 파일은 TypeScript에서 import하면 Vite가 배포 경로를 처리합니다.
