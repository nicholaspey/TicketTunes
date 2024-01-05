package csd.week5.transaction;

import java.util.List;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import com.fasterxml.jackson.annotation.JsonIgnore;

import csd.week5.ticket.Ticket;
import csd.week5.user.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double total_price;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = true)
    private User user;

    private boolean completed = false;

    private LocalDateTime localDateTime = LocalDateTime.now();

    @OneToMany(mappedBy = "transaction")
    //@JsonBackReference
    @JsonIgnore
    private List<Ticket> ticketList;

    public Transaction(double total_price, User user) {
        this.total_price = total_price;
        this.user = user;
    }

    void completed(){
        this.completed = true;
    }

}
