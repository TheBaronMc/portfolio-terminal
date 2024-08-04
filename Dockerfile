FROM oven/bun:debian as builder

RUN apt update && apt install -y procps

COPY package.json ./
COPY bun.lockb ./
COPY src ./src
COPY public ./public
COPY tsconfig.* ./
COPY index.html ./
COPY env.d.ts ./
COPY vite.config.ts ./

RUN bun install --ignore-scripts
RUN bun build-only

CMD ["bash"]

FROM nginx

EXPOSE 80

COPY --from=builder /home/bun/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]
