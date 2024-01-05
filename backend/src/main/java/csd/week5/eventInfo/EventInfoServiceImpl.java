package csd.week5.eventInfo;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class EventInfoServiceImpl implements EventInfoService {

    private EventInfoRepository eventInfoRepo;

    public EventInfoServiceImpl(EventInfoRepository eventInfoRepo) {
        this.eventInfoRepo = eventInfoRepo;
    }

    @Override
    public List<EventInfo> listEventInfo() {
        return eventInfoRepo.findAll();
    }

    @Override
    public EventInfo getEventInfo(Long id) {
        return eventInfoRepo.findById(id).orElse(null);
    }

    @Override
    public EventInfo addEventInfo(EventInfo newEventInfo) {
        return eventInfoRepo.save(newEventInfo);
    }

    @Override
    public EventInfo updateEventInfo(Long id, EventInfo updatedEventInfo) {
        return eventInfoRepo.findById(id).map(existingEventInfo -> {
            existingEventInfo.setEventName(updatedEventInfo.getEventName());
            existingEventInfo.setEventDetail(updatedEventInfo.getEventDetail());
            existingEventInfo.setDate(updatedEventInfo.getDate());
            existingEventInfo.setLocation(updatedEventInfo.getLocation());
            existingEventInfo.setTicketPricing(updatedEventInfo.getTicketPricing());
            existingEventInfo.setImageURL(updatedEventInfo.getImageURL());
            return eventInfoRepo.save(existingEventInfo);
        }).orElse(null);
    }

    @Override
    public void deleteEventInfo(Long id) {
        eventInfoRepo.deleteById(id);
    }
}