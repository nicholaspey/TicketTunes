package csd.week5.ticket;

public class TicketRequest {

    // @NotNull
    private boolean IsAvaiable;

    // @NotNull
    private long transaction_id;

    // Getters and setters
    public boolean getAvailable() {
        return IsAvaiable;
    }

    public void setIsAvailable(boolean isAvailable) {
        this.IsAvaiable = isAvailable;
    }

    public long getTransactionId() {
        return transaction_id;
    }

    public void setTransaction_id(int transaction_id) {
        this.transaction_id = transaction_id;
    }
}
