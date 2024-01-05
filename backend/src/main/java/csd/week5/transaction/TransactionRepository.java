package csd.week5.transaction;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends JpaRepository <Transaction, Long> {
   List<Transaction> findAllByCompleted(boolean bool);
   
}
