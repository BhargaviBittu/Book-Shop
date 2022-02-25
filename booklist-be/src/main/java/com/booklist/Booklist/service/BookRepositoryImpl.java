package com.booklist.Booklist.service;

import com.booklist.Booklist.Repository.BookRepository;
import com.booklist.Booklist.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookRepositoryImpl implements BookService {

    List<Book> list;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public void deletebook(long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Optional<Book> findByBookId(Long bookId) {
        return bookRepository.findById(bookId);
    }

}
