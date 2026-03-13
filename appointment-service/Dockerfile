# ---------- BUILD STAGE ----------
FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /build

# parent pom
COPY pom.xml .

# module pom (dependency cache)
COPY appointment-service/pom.xml appointment-service/pom.xml

# download dependencies
RUN mvn -B -DskipTests -pl appointment-service -am dependency:go-offline

# source
COPY appointment-service/src appointment-service/src

# build
RUN mvn -B -DskipTests -pl appointment-service -am package


# ---------- RUNTIME STAGE ----------
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

COPY --from=build /build/appointment-service/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java","-jar","/app/app.jar"]