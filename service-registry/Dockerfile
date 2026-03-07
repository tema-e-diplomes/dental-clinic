# Build stage
FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
# Copy the parent pom
COPY pom.xml .
# Copy the service code
COPY service-registry ./service-registry
# Build the service
RUN mvn -f service-registry/pom.xml clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/service-registry/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
