package csd.week5.ticket;

import static org.junit.jupiter.api.Assertions.*;

import java.net.URI;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import csd.week5.transaction.TransactionRepository;
import csd.week5.transaction.Transaction;
import csd.week5.user.User;
import csd.week5.user.UserRepository;

/** Start an actual HTTP server listening at a random port*/
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TransactionIntegrationTest {

	@LocalServerPort
	private int port;

	private final String baseUrl = "http://localhost:";

	@Autowired
	/**
	 * Use TestRestTemplate for testing a real instance of your application as an external actor.
	 * Convenient subclass of RestTemplate that is suitable for integration tests.
 	 * It is fault tolerant, and optionally can carry Basic authentication headers.
	 */
	private TestRestTemplate restTemplate;

	@Autowired
	private TransactionRepository transactions;

	@Autowired
	private UserRepository users;

	@Autowired
	private BCryptPasswordEncoder encoder;


	@AfterEach
	void tearDown(){
		transactions.deleteAll();
		users.deleteAll();
	}

	@Test
	public void getTransactions_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/Transactions");
		transactions.save(new Transaction(0.0, null));
		
		// Need to use array with a ReponseEntity here
		ResponseEntity<Transaction[]> result = restTemplate.getForEntity(uri, Transaction[].class);
		Transaction[] transactions = result.getBody();
		
		assertEquals(200, result.getStatusCode().value());
		assertEquals(1, transactions.length);
	}

	@Test
	public void getTransaction_ValidTransactionId_Success() throws Exception {
		Transaction Transaction = new Transaction(10.0, null);
		Long id = transactions.save(Transaction).getId();
		URI uri = new URI(baseUrl + port + "/Transactions/" + id);
		
		ResponseEntity<Transaction> result = restTemplate.getForEntity(uri, Transaction.class);
			
		assertEquals(200, result.getStatusCode().value());
		assertEquals(Transaction.getTotal_price(), result.getBody().getTotal_price());
	}

	@Test
	public void getTransaction_InvalidTransactionId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/Transactions/1");
		
		ResponseEntity<Transaction> result = restTemplate.getForEntity(uri, Transaction.class);
			
		assertEquals(404, result.getStatusCode().value());
	}

	@Test
	public void deleteTransaction_ValidTransactionId_Success() throws Exception {
		Transaction Transaction = transactions.save(new Transaction(10.0, null));
		URI uri = new URI(baseUrl + port + "/Transactions/" + Transaction.getId().longValue());
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<Void> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.DELETE, null, Void.class);
		
		assertEquals(200, result.getStatusCode().value());
		// An empty Optional should be returned by "findById" after deletion
		Optional<Transaction> emptyValue = Optional.empty();
		assertEquals(emptyValue, transactions.findById(Transaction.getId()));
	}
}
