FROM postgres:9.6

# root directory of postgress
# WORKDIR /var/lib/postgresql/data

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./seedIdentityData.zip /tmp

RUN apt-get update -y
RUN apt-get install -y unzip

RUN unzip /tmp/seedIdentityData.zip -d /var/lib/postgresql/data
RUN rm /tmp/seedIdentityData.zip