package csd.week5.ticket;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import csd.week5.transaction.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Ticket's title should not be null")
    @Size(min = 5, max = 200, message = "Ticket title should be at least 5 characters long")
    private String title;

    @NotBlank(message = "Ticket number should not be blank")
    private String ticket_number;

    @NotNull(message = "Seat number should not be null")
    private String seat_number;

    private int unit_price;

    private Boolean available = true;

    @ManyToOne
    @JoinColumn(name = "transaction_id", nullable = true)
    @JsonIgnore
    private Transaction transaction;

    public Ticket(String title, String ticket_number, String seat_number, int unit_price, boolean available) {
        this.title = title;
        this.ticket_number = ticket_number;
        this.seat_number = seat_number;
        this.unit_price = unit_price;
        this.available = available;
    }

    public Ticket(String title, String ticket_number, String seat_number, int unit_price) {
        this.title = title;
        this.ticket_number = ticket_number;
        this.seat_number = seat_number;
        this.unit_price = unit_price;
    }

    public void setAvailability(boolean b) {
        available = b;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }
}