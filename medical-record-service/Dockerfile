# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

# parent pom
COPY pom.xml .

# module pom (dependency cache)
COPY medical-record-service/pom.xml medical-record-service/pom.xml

# download dependencies
RUN mvn -B -DskipTests -pl medical-record-service -am dependency:go-offline

# source
COPY medical-record-service/src medical-record-service/src

# build jar
RUN mvn -B -DskipTests -pl medical-record-service -am package


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /build/medical-record-service/target/*.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java","-jar","/app/app.jar"]