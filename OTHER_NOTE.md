for port in 8081 9000 9001 9002 9003; do lsof -i :${port} | awk 'NR!=1 {print $2}' | xargs kill -9; done

npx react-native run-ios --device "ThanhVT16"

pnpm run:host:ios --simulator="iPhone 16 Pro"
