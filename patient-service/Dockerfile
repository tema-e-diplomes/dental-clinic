# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

# parent pom
COPY pom.xml .

# module pom (dependency cache)
COPY patient-service/pom.xml patient-service/pom.xml

# download dependencies
RUN mvn -B -DskipTests -pl patient-service -am dependency:go-offline

# source
COPY patient-service/src patient-service/src

# build jar
RUN mvn -B -DskipTests -pl patient-service -am package


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /build/patient-service/target/*.jar app.jar

EXPOSE 8084

ENTRYPOINT ["java","-jar","/app/app.jar"]