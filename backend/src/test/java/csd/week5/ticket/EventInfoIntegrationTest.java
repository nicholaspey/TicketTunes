package csd.week5.ticket;

import static org.junit.jupiter.api.Assertions.*;

import java.net.URI;
import java.util.Optional;

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

import csd.week5.eventInfo.EventInfoRepository;
import csd.week5.eventInfo.EventInfo;
import csd.week5.user.User;
import csd.week5.user.*;

/** Start an actual HTTP server listening at a random port*/
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
class EventInfoIntegrationTest {

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
	private EventInfoRepository eventInfoRepo;

	@Autowired
	private UserRepository users;

	@Autowired
	private BCryptPasswordEncoder encoder;


	@AfterEach
	void tearDown(){
		eventInfoRepo.deleteAll();
		users.deleteAll();
	}

	@Test
	public void getEventInfoRepo_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/home");
		eventInfoRepo.save(new EventInfo("BTS Concert", null, "Testing", "Testing", "Testing", "Testing"));
		
		// Need to use array with a ReponseEntity here
		ResponseEntity<EventInfo[]> result = restTemplate.getForEntity(uri, EventInfo[].class);
		EventInfo[] eventInfoRepo = result.getBody();
		
		assertEquals(200, result.getStatusCode().value());
		assertEquals(1, eventInfoRepo.length);
	}

	@Test
	public void getEventInfo_ValidEventInfoId_Success() throws Exception {
		EventInfo EventInfo = new EventInfo("BTS Concert", null, "Testing", "Testing", "Testing", "Testing");
		Long id = eventInfoRepo.save(EventInfo).getId();
		URI uri = new URI(baseUrl + port + "/eventInfo/" + id);
		
		ResponseEntity<EventInfo> result = restTemplate.getForEntity(uri, EventInfo.class);
			
		assertEquals(200, result.getStatusCode().value());
		assertEquals(EventInfo.getEventName(), result.getBody().getEventName());
	}

	@Test
	public void getEventInfo_InvalidEventInfoId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/eventInfo/1");
		
		ResponseEntity<EventInfo> result = restTemplate.getForEntity(uri, EventInfo.class);
			
		assertEquals(404, result.getStatusCode().value());
	}

	@Test
	public void addEventInfo_Success() throws Exception {
		URI uri = new URI(baseUrl + port + "/eventInfo");
		EventInfo EventInfo = new EventInfo("BTS Concert", null, "Testing", "Testing", "Testing", "Testing");
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);

		ResponseEntity<EventInfo> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.postForEntity(uri, EventInfo, EventInfo.class);
			
		assertEquals(201, result.getStatusCode().value());
		assertEquals(EventInfo.getEventName(), result.getBody().getEventName());
	}

	/**
	 * Integration tests for delete/update a EventInfo.
	 * For delete operation: there should be two tests for success and failure scenarios.
	 * Similarly, there should be two tests for update operation.
	 */
	@Test
	public void deleteEventInfo_ValidEventInfoId_Success() throws Exception {
		EventInfo EventInfo = eventInfoRepo.save(new EventInfo("BTS Concert", null, "Testing", "Testing", "Testing", "Testing"));
		URI uri = new URI(baseUrl + port + "/eventInfo/" + EventInfo.getId().longValue());
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);

		ResponseEntity<Void> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.DELETE, null, Void.class);
		
		assertEquals(200, result.getStatusCode().value());
		// An empty Optional should be returned by "findById" after deletion
		Optional<EventInfo> emptyValue = Optional.empty();
		assertEquals(emptyValue, eventInfoRepo.findById(EventInfo.getId()));
	}

	@Test
	public void deleteEventInfo_InvalidEventInfoId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/eventInfo/1");
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<Void> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.DELETE, null, Void.class);
		
		assertEquals(404, result.getStatusCode().value());
	}

	@Test
	public void updateEventInfo_ValidEventInfoId_Success() throws Exception {
		EventInfo EventInfo = eventInfoRepo.save(new EventInfo("BTS Concert", null, "Testing", "Testing", "Testing", "Testing"));
		URI uri = new URI(baseUrl + port + "/eventInfo/" + EventInfo.getId().longValue());
		EventInfo newEventInfo = new EventInfo("New Concert", null, "Testing", "Testing", "Testing", "Testing");
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<EventInfo> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.PUT, new HttpEntity<>(newEventInfo), EventInfo.class);
			
		assertEquals(200, result.getStatusCode().value());
		assertEquals(newEventInfo.getEventName(), result.getBody().getEventName());
	}

	@Test
	public void updateEventInfo_InvalidEventInfoId_Failure() throws Exception {
		URI uri = new URI(baseUrl + port + "/eventInfo/1");
		EventInfo newEventInfoInfo = new EventInfo("BTS Concert", null, "Testing", "Testing", "Testing", "Testing");
		User admin = new User("admin", encoder.encode("goodpassword"), "admin@gmail.com", "SMU building", "12345678");
		admin.setAdmin();
		users.save(admin);
		
		ResponseEntity<EventInfo> result = restTemplate.withBasicAuth("admin", "goodpassword")
										.exchange(uri, HttpMethod.PUT, new HttpEntity<>(newEventInfoInfo), EventInfo.class);
			
		assertEquals(404, result.getStatusCode().value());
	}
}
