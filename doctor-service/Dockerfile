# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

# parent pom
COPY pom.xml .

# module pom (dependency cache)
COPY doctor-service/pom.xml doctor-service/pom.xml

# download dependencies
RUN mvn -B -DskipTests -pl doctor-service -am dependency:go-offline

# source
COPY doctor-service/src doctor-service/src

# build jar
RUN mvn -B -DskipTests -pl doctor-service -am package


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /build/doctor-service/target/*.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java","-jar","/app/app.jar"]