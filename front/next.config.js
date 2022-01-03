// next.config.js
// ref4
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: (process.env.ANALYZE = "true"),
});

// ref3
module.exports = withBundleAnalyzer({
  // ref1
  compress: true,
  webpack(config, { webpack }) {
    // ref2
    const prod = process.env.NODE_ENV === "production";
    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval",
      plugins,
    };
  },
});

// 1. gzip으로 js, html, css를 압축하는게 좋음

// 2.
// next에서 쓰는 webpack config가 있어서
// 그걸(config)불러오고, 불변성을 지켜주며 커스터마이징해야함

// 3. .env에 작성할 수도 있지만 아래처럼 작성할 수도 있음
// scripts에 "build" : "ANALYZE=true, NODE_ENV=production next build"
// 근데 윈도우는 작동안됨 ㅎㅎ; cross-env다운받아서 실행해야 함
// "build" : "cross-env ANALYZE=true, NODE_ENV=production next build"

// cross-env , crossenv해킹 사건

// 4. 배포 직전 용량이 큰 파일을 확인할 수 있는 패키지
