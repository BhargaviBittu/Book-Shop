package com.booklist.Booklist.service;

import com.booklist.Booklist.model.Book;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

public interface BookService {
    public Book saveBook(Book book);
    public List<Book> getAllBooks();
    public void deletebook(@PathVariable long id);
    Optional<Book> findByBookId(@PathVariable Long bookId);

}

