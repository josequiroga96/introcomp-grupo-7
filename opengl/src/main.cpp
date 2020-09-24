#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <cstdio>
#include <iostream>

// Declaramos funciones que se definen despues
void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void processInput(GLFWwindow *window);

// Ancho y alto de la pantalla
const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 600;

// Codigo fuente (en C) para hacer los shaders
const char *vertexShaderSource = "#version 330 core\n"
                                 "layout (location = 0) in vec3 aPos;\n"
                                 "void main()\n"
                                 "{\n"
                                 "   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n"
                                 "}\0";
const char *fragmentShaderSource = "#version 330 core\n"
                                   "out vec4 FragColor;\n"
                                   "void main()\n"
                                   "{\n"
                                   "   FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n"
                                   "}\n\0";

namespace {
    void errorCallback(int error, const char *description) {
        fprintf(stderr, "GLFW error %d: %s\n", error, description);
    }

    //Crea una window
    GLFWwindow *initialize() {
        // Se crea una instancia de una ventana GLFW
        int glfwInitRes = glfwInit();
        // Verificamos que exista la instancia
        if (!glfwInitRes) {
            fprintf(stderr, "Unable to initialize GLFW\n");
            return nullptr;
        }
        // Configuración de la ventana
        glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
        glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
        glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
        // Configuración necesaria para que funcione en mac
        #ifdef __APPLE__
            glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);
        #endif

        // Creación de la ventana
        GLFWwindow *window = glfwCreateWindow(SCR_WIDTH, SCR_HEIGHT, "Ventana para el triangulo", nullptr, nullptr);
        if (!window) {
            fprintf(stderr, "Unable to create GLFW window\n");
            glfwTerminate();
            return nullptr;
        }
        // Hace que el contexto de la ventana especificada sea el actual
        glfwMakeContextCurrent(window);
        // Es un callback, cada ves que se cambia el tamaño llama a nuestra función
        glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

        // GLAD: cargar todas las funciones de punteros de OpenGL
        int gladInitRes = gladLoadGL();
        if (!gladInitRes) {
            fprintf(stderr, "Unable to initialize glad\n");
            glfwDestroyWindow(window);
            glfwTerminate();
            return nullptr;
        }

        return window;
    }
}

int main(int argc, char *argv[]) {
    // Es un catch de errores
    glfwSetErrorCallback(errorCallback);

    // Creamos nuestra window
    GLFWwindow *window = initialize();
    if (!window) {
        return 0;
    }

    // Se necesitan shaders para que el dibujo se vea por pantalla
    // -----------------------------------------------------------
    // vertex shader
    int vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vertexShaderSource, nullptr);
    glCompileShader(vertexShader);
    // check for shader compile errors
    int success;
    char infoLog[512];
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
    if (!success) {
        glGetShaderInfoLog(vertexShader, 512, nullptr, infoLog);
        std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;
    }
    // fragment shader
    int fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, nullptr);
    glCompileShader(fragmentShader);
    // check for shader compile errors
    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);
    if (!success) {
        glGetShaderInfoLog(fragmentShader, 512, nullptr, infoLog);
        std::cout << "ERROR::SHADER::FRAGMENT::COMPILATION_FAILED\n" << infoLog << std::endl;
    }
    // link shaders
    int shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader);
    glAttachShader(shaderProgram, fragmentShader);
    glLinkProgram(shaderProgram);
    // check for linking errors
    glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);
    if (!success) {
        glGetProgramInfoLog(shaderProgram, 512, nullptr, infoLog);
        std::cout << "ERROR::SHADER::PROGRAM::LINKING_FAILED\n" << infoLog << std::endl;
    }
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    // Setea los vertices (x, y, z -> siendo z profundidad)
    float vertices[] = {
            -0.5f, -0.5f, 0.0f,
            0.5f, -0.5f, 0.0f,
            0.0f, 0.5f, 0.0f
    };

    // Generamos dos IDs, un buffer y un array de vertices
    unsigned int VBO, VAO;
    glGenBuffers(1, &VBO);
    glGenVertexArrays(1, &VAO);

    // Agregamos nuestro buffer a la lista de buffers (solo hay un buffer por tipo)
    // también seteamos su tipo (GL_ARRAY_BUFFER -> Es un buffer que contiene un array de vertices)
    // Cualquier llamada a GL_ARRAY_BUFFER se utilizará para configurar el buffer enlazado, que es VBO.
    glBindBuffer(GL_ARRAY_BUFFER, VBO);

    // Enlazamos nuestro Vertex array
    glBindVertexArray(VAO);

    // Copia los datos de los vértices definidos en la memoria del buffer
    // Parametros:
    // 1. Tipo de buffer -> Como ya está enlazado entonces sabe que nos referimos al buffer VBO
    // 2. Tamaño (en bytes) de los datos
    // 3. Los datos -> en este caso son los vertices
    // 4. Como la tarjeta gráfica administra los datos (GL_STATIC_DRAW -> los datos se configuran solo una vez y se usan muchas veces.)
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    // Le decimos como interpretar los datos de los vertices
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);

    // Desvinculación de nuestro buffer
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    // Desvinculación de nuestro Vertex array
    glBindVertexArray(0);

    // render loop
    while (!glfwWindowShouldClose(window)) {
        // input
        processInput(window);

        // rendering commands here
        // -----------------------

        // Setea el color (verde)
        glClearColor(0.15f, 0.6f, 0.4f, 1.0f);
        // Se limpia la pantalla
        glClear(GL_COLOR_BUFFER_BIT);

        // dibujamos nuestro triangulo
        // ---------------------------
        // se dibujan nuestros shaders
        glUseProgram(shaderProgram);
        // enlazamos nuestro Vertex Array
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        // check and call events and swap the buffers
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    // Delete all
    glDeleteVertexArrays(1, &VAO);
    glDeleteBuffers(1, &VBO);
    glDeleteProgram(shaderProgram);

    // Cierra la ventana
    glfwDestroyWindow(window);
    glfwTerminate();

    // Cierra el programa
    return 0;
}

// Seteamos la tecla esc para cerrar la ventana
void processInput(GLFWwindow *window) {
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
}

// glfw: cada vez que se cambia el tamaño de la ventana, esta función se ejecuta
void framebuffer_size_callback(GLFWwindow* window, int width, int height) {
    glViewport(0, 0, width, height);
}