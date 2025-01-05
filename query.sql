CREATE DATABASE maka_project;

CREATE TABLE pickup_requests (
    id VARCHAR PRIMARY KEY,
    po_number VARCHAR(50) NOT NULL,
    part_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    dimensi_part VARCHAR(255) NOT NULL,
    weight INT NOT NULL,
    pickup_address VARCHAR(255) NOT NULL,
    destination_address VARCHAR(255) NOT NULL,
    pickup_date DATE NOT NULL,
    supplier_name VARCHAR(100) NOT NULL,
    requester_name VARCHAR(100) NOT NULL,
    import_documents TEXT NOT NULL,
    shipping_options VARCHAR(255) NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

SELECT * FROM pickup_requests;

SELECT * FROM pickup_requests WHERE id = '1';

INSERT INTO
    pickup_requests (
        id,
        po_number,
        part_name,
        quantity,
        dimensi_part,
        weight,
        pickup_address,
        destination_address,
        pickup_date,
        supplier_name,
        requester_name,
        import_documents,
        shipping_options
    )
VALUES (
        '1',
        'MKL001',
        'motor listrik',
        10,
        '10 cm, 5 cm, 2 cm',
        5,
        'Jl. Raya Jakarta',
        'Jl. Raya Bandung',
        '2023-02-20',
        'PT. Motor Listrik Indonesia',
        'Budi',
        'file1.pdf, file2.pdf',
        'JNE, J&T'
    );

UPDATE pickup_requests
SET
    po_number = 'MKL002',
    part_name = 'motor listrik 2',
    quantity = 20,
    dimensi_part = '15 cm, 7 cm, 3 cm',
    weight = 10,
    pickup_address = 'Jl. Raya Jakarta 2',
    destination_address = 'Jl. Raya Bandung 2',
    pickup_date = '2023-02-21',
    supplier_name = 'PT. Motor Listrik Indonesia 2',
    requester_name = 'Budi 2',
    import_documents = 'file3.pdf, file4.pdf',
    shipping_options = 'JNE, J&T 2'
WHERE
    id = '1';

DELETE FROM pickup_requests WHERE id = '1';

------------------------------------------------------------

CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    email VARCHAR(63) NOT NULL,
    password VARCHAR NOT NULL,
    fullname VARCHAR(31),
    role VARCHAR
);

SELECT * FROM users WHERE email = 'maka.admin@gmail.com';

INSERT INTO
    users (
        id,
        email,
        password,
        fullname,
        role
    )
VALUES (
        '783dq-7hd8q-7d87q',
        'maka.admin@gmail.com',
        'pw123',
        'Admin Maka',
        'admin'
    );

DELETE FROM users WHERE id = 'id.users';