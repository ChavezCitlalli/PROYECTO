CREATE DATABASE dataPrueba;
USE dataPrueba;
GO
CREATE TABLE usuarios (
    id_usuarios INT IDENTITY (1,1) NOT NULL,
	nombres VARCHAR (50) NOT NULL,
	apellidos VARCHAR (50) NOT NULL,
	email VARCHAR (255) NOT NULL,
	pass VARCHAR (60) NOT NULL,
	tipo_usuario VARCHAR (50) NOT NULL,
    fecha_creacion DATE NOT NULL,
    PRIMARY KEY (id_usuarios) 
);
GO

CREATE TABLE productos (
	producto_id INT NOT NULL,
	categoria VARCHAR (255) NOT NULL,
    titulo VARCHAR (50) NOT NULL,
    descripcion VARCHAR (255) NOT NULL,
	precio DECIMAL (15,2) NOT NULL,
	inventario INT NOT NULL,
    imagen VARCHAR (250) NOT NULL,
    PRIMARY KEY (producto_id)
);
GO

CREATE TABLE compras (
	id_compra INT NOT NULL,
	total DECIMAL (15,2) NOT NULL,
    numCalle VARCHAR (100) NOT NULL,
	pais VARCHAR (15) NOT NULL,
	direccion VARCHAR (20) NOT NULL,
	codigo_postal INT NOT NULL,
	forma_de_pago VARCHAR (50) NOT NULL,
	PRIMARY KEY (id_compra)
	);	
GO

CREATE TABLE detalles(
	id INT NOT NULL,
	producto VARCHAR (250) NOT NULL,
	precio DECIMAL (15,2) NOT NULL,
	cantidad INT NOT NULL,
	subtotal DECIMAL (15,2) NOT NULL,
	PRIMARY KEY(id),	
);
GO

//////////////PARA GENERAR UNA BASE DE PRODUCTOS PARA LA TIENDA ///////////

INSERT INTO productos(
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Kelloggs Corn Flakes',
    'Cereal Kelloggs Corn Flakes 500gr Hojuelas de maiz 100% natural',
	65,
	3000,
    'https://www.lavanguardia.com/files/content_image_mobile_filter/uploads/2019/08/26/5e99790f7cff3.jpeg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Yeo Valley',
    'Yeo edicion limitada sabor caramelo con alta cantidad de proteinas ',
	34,
	50,
    'https://i.pinimg.com/236x/18/d9/cf/18d9cf9922f4d080cac91a84416d2f41--yogurt-packaging-beverage-packaging.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Chobani Yogurt',
    'Edicion limitada sabor MANDARINA con 2% menos grasa 117grs ',
	40,
	50,
    'http://yaffa-cdn.s3.amazonaws.com/yaffadsp/images/dspArticle/leadImage/Chobani170Pot_Mandarin_Front-cropped2.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Corn Flakes',
    'Kelloggs Corn Flakes Chinese New Year Limited Edition ',
	40,
	50,
    'https://i.pinimg.com/originals/ab/ce/15/abce1586039c17a7573aeb03fa0db20e.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Fusilli Barilla',
    'Pasta Fusille 500gr individual ',
	35,
	30,
	'https://lh3.googleusercontent.com/proxy/MWDysq7SI0aMwvpMzg7P-0Vp1GzBFSP5APkKSJjazUmTIutVcMuQiIgLkmkegF1HGyJ_6YIT2Uftvz5FlZAGwVHSF_JQAQ33Q81RLfzLt9A'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Bi frutas',
    'Jugo de frutas naturales en ambas presentaciones 250ml y 1L',
	35,
	30,
	'https://www.foodretail.es/2021/07/22/fabricantes/Bifrutas-ahorra-envases-toneladas-plastico_1567653259_646055_180x180.png'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'Harina Para Hotcakes con Proteína ',
    'Morama Harina Para Hotcakes con Proteína Hecha con Harina de Arroz Integral y Coco y Enriquecida con 13 Gramos de Proteína por Porción',
	35,
	30,
	'https://m.media-amazon.com/images/I/7188QI-1aQL._AC_SL1500_.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'PITAYA 120GR ( DRAGON FRUIT) ',
    '100% PITAYA en polvo Deshidratado en frío Buena fuente de vitaminas y antioxidantes',
	240,
	30,
	'https://m.media-amazon.com/images/I/41sfEiE-zNL._AC_.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'EURO TE - Blue Matcha - lata de 50 gramos ',
    ' Sin cafeína, sin azúcar, sin lactosa, sin gluten y sin colorantes.',
	259.20,
	39,
	'https://m.media-amazon.com/images/I/51lKO1fu4aL._AC_SL1200_.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'EURO TE Verde Matcha Premium lata de 50 gramos ',
    'El Matcha es un Té verde japonés en forma de polvo fino, de color verde claro brillante y sabor intenso. ',
	269.20,
	39,
	'https://m.media-amazon.com/images/I/41E5LmJgA5L._AC_.jpg'
);

INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'EURO TE - Blue Matcha - lata de 50 gramos ',
    ' Sin cafeína, sin azúcar, sin lactosa, sin gluten y sin colorantes.',
	259.20,
	39,
	'https://m.media-amazon.com/images/I/51lKO1fu4aL._AC_SL1200_.jpg'
);
INSERT INTO productos(
	
	categoria,
    titulo,
    descripcion,
	precio,
	inventario,
    imagen
)VALUES (
	
	'Alimentos y bebidas',
    'EURO TE - Blue Matcha - lata de 50 gramos ',
    ' Sin cafeína, sin azúcar, sin lactosa, sin gluten y sin colorantes.',
	259.20,
	39,
	'https://m.media-amazon.com/images/I/51lKO1fu4aL._AC_SL1200_.jpg'
);