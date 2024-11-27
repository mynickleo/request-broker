package interfaces

type ArchiveModule interface {
	Initialization() error
	GetService() ArchiveService
}

type QueueModule interface {
	Initialization() error
	RunProcessQueue(s QueueService)
}

type ReadyModule interface {
	Initialization() error
}
