# Build stage
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY api-gateway ./api-gateway
RUN mvn -f api-gateway/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/api-gateway/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]