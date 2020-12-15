namespace GameInsightsApp.Models.Enums
{
    public enum GameEventType
    {
        CapturedTheFlag = 0,
        FlagPickedUp,
        LostTheFlag,
        FlagInterceptedByAnotherTeam,
        FlagIsReturnedToTheBase,
        FlagIsReturnedToTheBaseByTimeout,
        FlagIsBroughtToTheEnemyBase
    }
}