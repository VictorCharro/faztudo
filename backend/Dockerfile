FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Instala Maven
RUN apk add --no-cache maven

# Copia pom.xml
COPY pom.xml .

# Copia apenas o código Java
COPY src/main/java ./src/main/java

# Cria pasta resources e arquivo properties limpo
RUN mkdir -p src/main/resources && \
    printf "server.port=\${PORT:10000}\nspring.profiles.active=prod\n" > src/main/resources/application.properties

# Compila
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 10000

ENV SPRING_PROFILES_ACTIVE=prod

CMD ["java", "-jar", "app.jar"]