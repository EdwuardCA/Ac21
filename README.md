# Proyecto: Cifrado Hill con Matrices

## Información del Proyecto
- **Alumno:** Luis Edwuard Chay Ascorra
- **Materia:** Fundamentos de Álgebra
- **Grupo:** 1A
- **Repositorio:** https://github.com/EdwuardCA/Ac21.git
- **Página desplegada:** https://edwuardca.github.io/Ac21/

---

## Descripción del Proyecto
Este proyecto implementa el algoritmo de Cifrado Hill mediante operaciones matriciales aplicadas sobre un mensaje ingresado por el usuario. El algoritmo permite:
- Convertir un texto en una matriz numérica.
- Encriptar el mensaje multiplicando esa matriz por una matriz clave.
- Calcular el determinante de la matriz clave para comprobar si es válida.
- Calcular la matriz inversa módulo 26 para desencriptar.

El proyecto utiliza **HTML** para la estructura, **CSS** para el diseño visual y **JavaScript** para la lógica matemática del cifrado.

---

# Matemáticas utilizadas

## 1. Representación del mensaje como matriz
Cada letra del abecedario se transforma en un número:

$$ A = 0,\ B = 1,\ ..., \ Z = 25 $$

Por ejemplo:

$$ H = 7,\quad I = 8 $$

Se agrupan en pares formando una matriz vectorial:

$$
\begin{pmatrix}
7 & 8 \\
\end{pmatrix}
$$

Si el número de caracteres es impar, el programa agrega automáticamente la letra “X”.

---

### 2. Matriz clave 2×2
La matriz clave es un elemento fundamental del Cifrado Hill.
Debe ser una matriz cuadrada de 2×2, porque el algoritmo trabaja con pares de letras.

En la aplicación, el usuario escribe los cuatro valores en los campos correspondientes (a, b, c, d), formando la matriz:

$$
K = \begin{pmatrix}
a & b \\
c & d \\
\end{pmatrix}
$$

Esta matriz es la que se utilizará para multiplicarse por los vectores del mensaje y generar el texto encriptado.
Para que el proceso funcione correctamente:

- Su determinante no debe ser 0.
- Debe tener inversa módulo 26, ya que esta se usa para desencriptar.


### 3. Determinante de la matriz
Se calcula como:
```
det = ad - bc
```
Si el determinante es 0, la matriz no es invertible y el método no funciona.

---

### 4. Cifrado mediante multiplicación de matrices
La fórmula usada es:

$$
C = K \cdot M \mod 26
$$


Ejemplo visual:

$$
K = \begin{pmatrix}
2 & 3 \\
1 & 4 \\
\end{pmatrix}
$$

$$
M = \begin{pmatrix}
7 \\
8 \\
\end{pmatrix}
$$


Multiplicación:

$$
\begin{pmatrix}
2(7) + 3(8) \\
1(7) + 4(8) \\
\end{pmatrix}
\mod 26 =
\begin{pmatrix}
20 \\
13 \\
\end{pmatrix}
\Rightarrow UN
$$

Mensaje encriptado:
```
UN
```

---

### 5. Matriz inversa modulo 26
Para desencriptar, el programa calcula la inversa módulo 26:

$$
K^{-1} = (\det(K))^{-1}
\begin{pmatrix}
d & -b \\
-c & a \\
\end{pmatrix}
\mod 26
$$

Se aplica nuevamente módulo 26 para mantener los valores dentro del alfabeto.


---

### 6. Desencriptación
El proceso es la misma multiplicación matricial pero utilizando la matriz inversa:

$$
M = K^{-1} \cdot C \mod 26
$$


Esto recupera el mensaje original.

---

## Ejemplo completo del proyecto

### Mensaje:
```
HOLA
```

Conversión:

$$
H = 7,\quad O = 14,\quad L = 11,\quad A = 0
$$

Matriz:

$$
M = \begin{pmatrix}
7 & 14 \\
11 & 0 \\
\end{pmatrix}
$$

Matriz clave:

$$
K = \begin{pmatrix}
3 & 5 \\
2 & 7 \\
\end{pmatrix}
$$


Multiplicación visual:


$$
K \cdot
\begin{pmatrix}
7 \\
14 \\
\end{pmatrix} =
\begin{pmatrix}
3(7)+5(14) \\
2(7)+7(14) \\
\end{pmatrix}
\mod 26 =
\begin{pmatrix}
20 \\
13 \\
\end{pmatrix}
\Rightarrow UN
$$


Resultado final:
```
UN
```

---

# Instrucciones de Uso
1. Escribir un mensaje en la casilla.
2. Ingresar los valores de la matriz clave.
3. Presionar “Encriptar”.
4. Para desencriptar, pegar el mensaje cifrado y presionar “Desencriptar”.

---

# Personalización realizada
El proyecto incluye las siguientes características de diseño:
- Interfaz visual limpia.
- Fondos degradados.
- Efecto tipo "matrix" en movimiento.
- Contenedores estilizados con CSS.

---

# Archivos del Proyecto
- **index.html:** Estructura visual e inputs para el usuario.
- **style.css:** Estilos, colores, tipografía, efectos.
- **script.js:** Implementación matemática:
  - Conversión texto → número.
  - Multiplicación de matrices.
  - Determinante.
  - Inversa módulo 26.
  - Desencriptación.

---

# Despliegue Web
El proyecto debe estar disponible públicamente mediante una URL accesible:
```
https://edwuardca.github.io/Ac21/
```

---

# Conclusión
Este proyecto permitió implementar el cifrado Hill mediante matrices utilizando operaciones matemáticas como producto matricial, determinante, matriz inversa y módulo. Se integra programación con álgebra lineal y diseño de interfaz, reforzando la aplicación práctica de las matemáticas en criptografía.

