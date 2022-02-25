package com.booklist.Booklist.model;

import org.springframework.format.annotation.NumberFormat;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Size;

@Entity
@Table(name = "book")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @Size(min = 5, max = 20, message = "Buchtitel muss zwischen 5 und 20 Zeichen")
    private String title;

    @Column(nullable = false)
    @Size(min = 5, max = 20, message = "Buchauthor muss zwischen 5 und 20 Zeichen")
    private String author;

    @Column(nullable = false)
    private Long isbnNumber;

    @Column(nullable = false)
    @DecimalMin(value = "1.00", message = "Price min value is 1.0")
    private Long price;

    @Column(nullable = false)
    private String language;

    public Book(){

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public Long getIsbnNumber() {
        return isbnNumber;
    }

    public void setIsbnNumber(Long isbnNumber) {
        this.isbnNumber = isbnNumber;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}
