FROM nginx:1.18

## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy over the artifacts in build folder to default nginx public folder
COPY dist/surveyBuilder /usr/share/nginx/html/admin

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]