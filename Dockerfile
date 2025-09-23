FROM openjdk:17-jdk-slim

WORKDIR /app

# Copia os arquivos do projeto
COPY . .

# Se usar Maven
RUN ./mvnw clean package -DskipTests

# Ou se usar Gradle
# RUN ./gradlew build -x test

# Expõe a porta
EXPOSE 10000

# Comando para rodar
CMD ["java", "-jar", "target/*.jar"]