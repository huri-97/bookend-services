package com.bookend.bookservice.config;

import com.bookend.bookservice.model.Book;
import com.bookend.bookservice.repository.BookRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = BookRepository.class)
@Configuration
public class MongoDBConfig {

    //after running one time make the method as comment
    @Bean
    CommandLineRunner commandLineRunner(BookRepository bookRepository) {
        bookRepository.deleteAll();
        return strings -> {
            bookRepository.save(new Book( 586,"Classics","The novel evolved and expanded from an 1849 short story or sketch entitled \"Oblomov's Dream\". The novel focuses on the midlife crisis of the main character, Ilya Ilyich Oblomov, an upper middle class son of a member of Russia's nineteenth century landed gentry.", "Oblomov","Ivan Goncharov"));
            bookRepository.save(new  Book(194,"Science Fiction","Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.", "Fahrenheit 451","Ray Bradbury"));


        };
    }

}