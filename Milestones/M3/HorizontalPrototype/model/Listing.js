const db = require('../database/db');

class Register {
    constructor(landlord_id, street_num, street_name, city, state, zipcode, description, bed, bath, price, file_name) {
        this.landlord_id = landlord_id;
        this.street_num = street_num;
        this.street_name = street_name;
        this.city = city;
        this.state = state;
        this.zipcode = zipcode;
        this.description = description;
        this.bed = bed;
        this.bath = bath;
        this.price = price;
        this.file_name = file_name;
    }

    save() {
        let d = new Date();
        let yyyy = d.getFullYear();
        let mm = d.getMonth() + 1 ;
        let dd = d.getDay();

        let createdAtDate = `${yyyy}-${mm}-${dd }`; 

        let sql = `
        INSERT INTO listing(
            landlord_id,
            street_number, 
            street_name, 
            city, 
            state, 
            zipcode, 
            description,
            bed, 
            bath,
            price, 
            created_at,
            file_name
            
        )
        VALUES (
            '${this.landlord_id}',
            '${this.street_num}',
            '${this.street_name}',
            '${this.city}',
            '${this.state}',
            '${this.zipcode}',
            '${this.description}',
            '${this.bed}',
            '${this.bath}',
            '${this.price}',
            '${createdAtDate}',
            '${file_name}'
        )
        `;

        return db.execute(sql);  
 
    }

    static search(filters) { //TODO
        let sql = `SELECT * FROM listing WHERE `;
        console.log(filters);
        if(filters.min != 'undefined')
        {
            sql += `price > '${filters.min}' AND `;
        }
        if(filters.max != 'undefined')
        {
            sql += `price < '${filters.max}' AND `;
        }
        if(filters.bed != 'undefined')
        {
            sql += `bed = '${filters.bed}' AND `;
        }
        if(filters.bath != 'undefined')
        {
            sql += `bath = '${filters.bath}' AND `;
        }
        if(filters.rating != 'undefined')
        {
            sql += `rating = ${filters.rating} AND `;
        }

        sql = sql.substring(0, sql.length - 4);

        sql += `;`;

        return db.execute(sql); 
    }

    static getListByZipcode(zipcode) {
        let sql = `SELECT * FROM listing WHERE zipcode LIKE '${zipcode}' OR street_number LIKE '${zipcode}';`;

        return db.execute(sql); 
    }

    static getListByCity(city) {
        let sql = `SELECT * FROM listing WHERE city LIKE '%${city}%' OR street LIKE '%${city}%';`;
        
        return db.execute(sql); 
    }

    static getListByAddress(city) {
        let sql = `SELECT * FROM listing WHERE address LIKE '%${city}%';`;
        
        return db.execute(sql); 
    }

    static findAll() {
        let sql = `SELECT * FROM listing WHERE listing_id BETWEEN '0' AND '7';`;

        return db.execute(sql); 
    }

    static getListingById(id) {
        let sql = `SELECT * FROM posts WHERE listing_id=${id}`;
        return db.execute(sql);
    }

}

module.exports = Register;