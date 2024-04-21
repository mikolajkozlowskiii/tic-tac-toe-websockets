FROM openjdk:23-slim AS build

ARG MAVEN_VERSION=3.8.5
ENV MAVEN_HOME=/opt/maven
ENV MAVEN_OPTS="-Xms256m -Xmx512m"

RUN apt-get update && \
    apt-get install -y wget && \
    wget -qO- https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz | tar xz -C /opt && \
    ln -s /opt/apache-maven-${MAVEN_VERSION} /opt/maven && \
    ln -s /opt/maven/bin/mvn /usr/local/bin/mvn

WORKDIR /app
COPY . .

RUN mvn -f pom.xml clean package

FROM openjdk:23-slim

ARG JAR_FILE=/app/target/*.jar
COPY --from=build ${JAR_FILE} /app/app.jar

ENTRYPOINT ["java","-jar","/app/app.jar"]