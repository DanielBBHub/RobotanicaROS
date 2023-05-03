create table invernaderos(
    dniUser    varchar(9)    primary key not null,
    nombre    varchar(50)    not null,
    direccion    varchar(50)    not null,
    area    INTEGER    not null,
    tipo    varchar(50)    not null,
    idInvernadero    varchar(52)    not null,
    foreign key (idInvernadero) references Productos(idInvernadero)
);


insert into invernaderos values('12345678A', 'Invernadero1', 'Calle Falsa 123', 100, 'Hidroponico','78AInvernadero1');
insert into invernaderos values('12345672A', 'Invernadero2', 'Calle Falsa 125', 52, 'Hidroponico','72AInvernadero2');