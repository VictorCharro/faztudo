FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Instala Maven
RUN apk add --no-cache maven

# Copia arquivos do Maven
COPY pom.xml .

# Baixa dependências
RUN mvn dependency:go-offline -B || true

# Copia código fonte
COPY src ./src

# Compila
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copia o JAR compilado
COPY --from=build /app/target/*.jar app.jar

# Expõe porta
EXPOSE 10000

# Comando
CMD ["java", "-jar", "app.jar"]