package com.booklist.Booklist.controller;

import com.booklist.Booklist.Repository.BookRepository;
import com.booklist.Booklist.model.Book;
import com.booklist.Booklist.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/book")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;


    @PostMapping("/add")
    public ResponseEntity<Object> add(@Valid @RequestBody Book book, BindingResult bindingResult){
        if(bindingResult.hasErrors()){
            return new ResponseEntity<Object>(bindingResult.getAllErrors(), HttpStatus.BAD_REQUEST);
        }
        else {
            bookService.saveBook(book);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/getAll")
    public List<Book> list(){
        return bookService.getAllBooks();
    }

    @PostMapping("/update")
  public String update(@RequestBody Book book){
      bookService.saveBook(book);
      return "New book is updated";
  }

    @DeleteMapping("/delete/{id}")
    public void deletebook(@PathVariable long id) {
        bookService.deletebook(id);
    }

    @GetMapping("/getBooks/{bookId}")
    public Optional<Book> findByBookId(@PathVariable Long bookId) {
       return bookRepository.findById(bookId);
    }

}
