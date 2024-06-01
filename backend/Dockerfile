FROM maven:3.8.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:23-slim
ARG JAR_FILE=target/*.jar
COPY --from=build /app/${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]