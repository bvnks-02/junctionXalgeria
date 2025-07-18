using Models;

public interface INotificationService
{
    public Task Notify(Alert alert);
    
}