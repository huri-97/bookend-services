package com.bookclupservice.bookclubservice.repository;

import com.bookclupservice.bookclubservice.model.Member;
import com.bookclupservice.bookclubservice.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findByWriter(Member writer);
    List<Post> findByClubId(Long clubId);
    Post findPostById(Long postId);

}
