describe ApplicationJob, type: :job do
  it { expect(described_class).to be < ActiveJob::Base }
end
