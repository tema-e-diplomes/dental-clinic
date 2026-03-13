# BUILD
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /build

COPY pom.xml .
COPY api-gateway/pom.xml api-gateway/pom.xml

RUN mvn -B -DskipTests -pl api-gateway -am dependency:go-offline

COPY api-gateway/src api-gateway/src

RUN mvn -B -DskipTests -pl api-gateway -am package


# RUNTIME
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

COPY --from=build /build/api-gateway/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]