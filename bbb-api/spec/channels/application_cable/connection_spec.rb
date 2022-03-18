describe ApplicationCable::Connection, type: :channel do
  it { expect(described_class).to be < ActionCable::Connection::Base }
end
