package csd.week5.ticket;
import csd.week5.eventInfo.EventInfo;
import csd.week5.eventInfo.EventInfoRepository;
import csd.week5.eventInfo.EventInfoServiceImpl;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class EventInfoServiceTest {

    @Mock
    private EventInfoRepository eventInfoRepo;

    @InjectMocks
    private EventInfoServiceImpl eventInfoService;

    @Test
    void addEventInfo_NewTitle_ReturnSavedEventInfo() {
        // arrange ***
        EventInfo eventInfo = new EventInfo("Twice", null, null, null, null, null);
        
        // mock the "save" operation
        when(eventInfoRepo.save(any (EventInfo.class))).thenReturn(eventInfo);

        // act ***
        EventInfo savedEventInfo = eventInfoService.addEventInfo(eventInfo);

        // assert ***
        assertNotNull(savedEventInfo);
        verify(eventInfoRepo).save(eventInfo);
    }

    @Test
    void updateEventInfo_NotFound_ReturnNull() {
        Long eventInfoId = 10L;
        EventInfo eventInfo = new EventInfo("Dummy", null, null, null, null, null);

        when(eventInfoRepo.findById(eventInfoId)).thenReturn(Optional.empty());

        EventInfo updatedEventInfo = eventInfoService.updateEventInfo(eventInfoId, eventInfo);

        assertNull(updatedEventInfo);
        verify(eventInfoRepo).findById(eventInfoId);
    }

    @Test
    void updateEventInfo_Found_ReturnEventInfo() {
        EventInfo eventInfo = new EventInfo("Twice", new ArrayList<>(), "Testing", "Testing", "Testing", "Testing");
        EventInfo newEventInfo = new EventInfo("Updated", new ArrayList<>(), "Testing", "Testing", "Testing", "Testing");
        Long eventInfoId = 10L;
        Optional<EventInfo> original = Optional.of(eventInfo);
        when(eventInfoRepo.findById(eventInfoId)).thenReturn(original);
        when(eventInfoRepo.save(eventInfo)).thenReturn(eventInfo);

        EventInfo updatedEventInfo = eventInfoService.updateEventInfo(eventInfoId, newEventInfo);

        assertEquals(newEventInfo, updatedEventInfo);
        verify(eventInfoRepo).findById(eventInfoId);
        verify(eventInfoRepo).save(eventInfo);
    }

    @Test
    void getEventInfo_Found_ReturnEventInfo() {
        EventInfo eventInfo = new EventInfo("Twice", null, null, null, null, null);
        Long id = 1L;

        when(eventInfoRepo.findById(id)).thenReturn(Optional.of(eventInfo));

        EventInfo getEventInfo = eventInfoService.getEventInfo(id);

        assertEquals(eventInfo, getEventInfo);
        verify(eventInfoRepo).findById(id);
    }

    @Test
    void getEventInfo_NotFound_ReturnNull() {
        Long id = 1L;

        when(eventInfoRepo.findById(id)).thenReturn(Optional.empty());

        EventInfo getEventInfo = eventInfoService.getEventInfo(id);

        assertNull(getEventInfo);
        verify(eventInfoRepo).findById(id);
    }
}