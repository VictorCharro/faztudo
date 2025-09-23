FROM maven:3.8.6-openjdk-17-slim AS build

WORKDIR /app

# Copia apenas o essencial
COPY pom.xml .
COPY src/main/java src/main/java

# Cria um application.properties básico para produção
RUN mkdir -p src/main/resources && \
    echo "server.port=\${PORT:10000}" > src/main/resources/application.properties && \
    echo "spring.profiles.active=prod" >> src/main/resources/application.properties

# Compila o projeto
RUN mvn clean package -DskipTests

# Segunda etapa - runtime
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copia o JAR
COPY --from=build /app/target/*.jar app.jar

# Expõe a porta
EXPOSE 10000

# Comando para rodar
CMD ["java", "-jar", "app.jar"]