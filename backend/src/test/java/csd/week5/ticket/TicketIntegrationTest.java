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
import csd.week5.user.User;
import csd.week5.user.UserRepository;

/** Start an actual HTTP server listening at a random port*/
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class TicketIntegrationTest {

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
	private TicketRepository tickets;

	@Autowired
	private UserRepository users;

	@Autowired
	private BCryptPasswordEncoder encoder;


	@AfterEach
	void tearDown(){
		tickets.deleteAll();
		users.deleteAll();
	}

	@Test
	public void getTickets_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/tickets");
		tickets.save(new Ticket("BTS Concert", "123456789", "1k65cv", 100));
		
		// Need to use array with a ReponseEntity here
		ResponseEntity<Ticket[]> result = restTemplate.getForEntity(uri, Ticket[].class);
		Ticket[] tickets = result.getBody();
		
		assertEquals(200, result.getStatusCode().value());
		assertEquals(1, tickets.length);
	}

	@Test
	public void getTicket_ValidTicketId_Success() throws Exception {
		Ticket Ticket = new Ticket("BTS Concert", "123456789", "1k65cv", 100);
		Long id = tickets.save(Ticket).getId();
		URI uri = new URI(baseUrl + port + "/tickets/" + id);
		
		ResponseEntity<Ticket> result = restTemplate.getForEntity(uri, Ticket.class);
			
		assertEquals(200, result.getStatusCode().value());
		assertEquals(Ticket.getTitle(), result.getBody().getTitle());
	}

	@Test
	public void getTicket_InvalidTicketId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/tickets/1");
		
		ResponseEntity<Ticket> result = restTemplate.getForEntity(uri, Ticket.class);
			
		assertEquals(404, result.getStatusCode().value());
	}

	@Test
	public void addTicket_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/tickets");
		Ticket Ticket = new Ticket("BTS Concert", "123456789", "1k65cv", 100);
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);

		ResponseEntity<Ticket> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.postForEntity(uri, Ticket, Ticket.class);
			
		assertEquals(201, result.getStatusCode().value());
		assertEquals(Ticket.getTitle(), result.getBody().getTitle());
	}

	/**
	 * Integration tests for delete/update a Ticket.
	 * For delete operation: there should be two tests for success and failure scenarios.
	 * Similarly, there should be two tests for update operation.
	 */
	@Test
	public void deleteTicket_ValidTicketId_Success() throws Exception {
		Ticket Ticket = tickets.save(new Ticket("BTS Concert", "123456789", "1k65cv", 100));
		URI uri = new URI(baseUrl + port + "/tickets/" + Ticket.getId().longValue());
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<Void> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.DELETE, null, Void.class);
		
		assertEquals(200, result.getStatusCode().value());
		// An empty Optional should be returned by "findById" after deletion
		Optional<Ticket> emptyValue = Optional.empty();
		assertEquals(emptyValue, tickets.findById(Ticket.getId()));
	}

	@Test
	public void deleteTicket_InvalidTicketId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/tickets/1");
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<Void> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.DELETE, null, Void.class);
		
		assertEquals(404, result.getStatusCode().value());
	}

	@Test
	public void updateTicket_ValidTicketId_Success() throws Exception {
		Ticket Ticket = tickets.save(new Ticket("BTS Concert", "123456789", "1k65cv", 100));
		URI uri = new URI(baseUrl + port + "/tickets/" + Ticket.getId().longValue());
		Ticket newTicketInfo = new Ticket("BTS Concert", "123456789", "1k65cv", 100);
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<Ticket> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.PUT, new HttpEntity<>(newTicketInfo), Ticket.class);
			
		assertEquals(200, result.getStatusCode().value());
		assertEquals(newTicketInfo.getTitle(), result.getBody().getTitle());
	}

	@Test
	public void updateTicket_InvalidTicketId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/tickets/1");
		Ticket newTicketInfo = new Ticket("BTS Concert", "123456789", "1k65cv", 100);
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<Ticket> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.PUT, new HttpEntity<>(newTicketInfo), Ticket.class);
			
		assertEquals(404, result.getStatusCode().value());
	}
}