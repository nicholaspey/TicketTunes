package csd.week5.session;

import java.util.List;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne; // Import the ManyToOne annotation
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import csd.week5.user.*;
import csd.week5.transaction.*;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long startTime;

    private long duration;

    @OneToOne
    @JoinColumn(name = "transaction_id", nullable = true)
    private Transaction transaction;



    public Session(long startTime, long duration, Transaction transaction) {
        this.startTime = System.currentTimeMillis();
        this.duration = 10000; // TODO: change to actual duration time when code works
        this.transaction = transaction;
    }
}